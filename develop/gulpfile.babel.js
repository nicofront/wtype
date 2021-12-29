import autoprefixer from 'gulp-autoprefixer';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import cleanCSS from 'gulp-clean-css';
import gulp from 'gulp';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import terser from 'gulp-terser';
import merge from 'merge-stream';
import concat from 'gulp-concat';
import mjml from 'gulp-mjml';
import mjmlEngine from 'mjml';
import replace from 'gulp-replace';

/**
 * Paths object
 */
const paths = {
    styles: {
        main: 'scss/main.scss',
        src: 'scss/**/*.scss',
        dest: '../assets/css/'
    },
    scripts: {
        main: 'js/index.js',
        src: 'js/**/*.js',
        requirements: [
            'js/lib/empty.js',
        ],
        dest: '../assets/js/'
    },
    markup: {
        src: '**/*.{html,php}'
    },
    mails: {
        src: './emails/*.mjml',
        dest: '../site/templates/emails'
    },
    includes: {
        node_modules: ['./node_modules']
    }
};

/**
 * Watch SCSS task
*/
export function watchStyles() {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({ includePaths: paths.includes.node_modules }))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(
            rename({
                basename: 'main.min'
            })
        )
        .pipe(gulp.dest(paths.styles.dest));
}

/**
 * Build SCSS task
 */
export function buildStyles() {
    return gulp
        .src(paths.styles.src)
        .pipe(sass({ includePaths: paths.includes.node_modules }))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(
            rename({
                basename: 'main.min'
            })
        )
        .pipe(gulp.dest(paths.styles.dest));
}

/**
 * Watch JS task
 */
export function watchScripts() {
    const b = browserify({ entries: [paths.scripts.main] })
        .transform('babelify', {
            global: true,
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-syntax-dynamic-import',
                '@babel/proposal-class-properties',
                '@babel/proposal-object-rest-spread'
            ]
        })
        .bundle()
        .pipe(source('mymodule-bundle.js'))
        .pipe(buffer());

    return merge(b, gulp.src(paths.scripts.requirements))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(paths.scripts.dest));
}

/**
 * Build JS task
 */
export function buildScripts() {
    const b = browserify({ entries: [paths.scripts.main] })
        .transform('babelify', {
            global: true,
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-syntax-dynamic-import',
                '@babel/proposal-class-properties',
                '@babel/proposal-object-rest-spread'
            ]
        })
        .bundle()
        .pipe(source('mymodule-bundle.js'))
        .pipe(buffer());

    return merge(b, gulp.src(paths.scripts.requirements))
        .pipe(concat('app.min.js'))
        .pipe(
            terser({
                compress: {
                    drop_console: true
                }
            })
        )
        .pipe(gulp.dest(paths.scripts.dest));
}

/**
 * Build MJML EMAILS task
 */
function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

export function buildMails() {
    return gulp
        .src(paths.mails.src)
        .pipe(replace('<!-- {{', '{{'))
        .pipe(replace('}} -->', '}}'))
        .pipe(mjml(mjmlEngine, { validationLevel: 'strict' }))
        .on('error', handleError)
        .pipe(replace('<!-- {{', '{{'))
        .pipe(replace('}} -->', '}}'))
        .pipe(replace('{{e ', '<?= '))
        .pipe(replace('{{', '<?php '))
        .pipe(replace('}}', ' ?>'))
        .pipe(
            rename(function(path) {
                path.extname = '.html.php';
            })
        )
        .pipe(gulp.dest(paths.mails.dest));
}

/**
 * File watcher
 */
export function watchFiles() {
    gulp.watch(paths.styles.src, gulp.series(watchStyles));
    gulp.watch(paths.scripts.src, gulp.series(watchScripts));
}

/**
 * Watch task
 */
// const watch = gulp.series(clean, gulp.parallel(watchStyles, watchScripts), serve, watchFiles);
const watch = gulp.series(gulp.parallel(watchStyles, watchScripts), watchFiles);

/**
 * Build task
 */
export const build = gulp.series(gulp.parallel(buildStyles, buildScripts));

/**
 * Default task
 */
export default watch;
