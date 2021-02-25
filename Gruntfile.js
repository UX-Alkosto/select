
"use strict";
module.exports = grunt => {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            dist: ["dist/css/*", "dist/js/*"]
        },
        cssmin: {
            options: {
                compatibility: "ie8",
                report: "gzip",
                inline: ["local"],
                level: {
                    1: {
                        all: true
                    },
                    2: {
                        all: true
                    }
                }
            },
            dist: {
                expand: true,
                cwd: "dist/css",
                src: ["*.css"],
                dest: "dist/css"
            }
        },
        less: {
            options: {
                banner: "/*! <%= pkg.name %> - v<%= pkg.version %> */",
                compress: true,
                paths: ["dist/css"],
                plugins: [
                    new (require("less-plugin-autoprefix"))({ browsers: ["last 2 versions"] }),
                    new (require("less-plugin-clean-css"))({ advanced: true })
                ]
            },
            dist: {
                files: {
                    "dist/css/<%= pkg.name %>.css": "src/less/<%= pkg.name %>.less"
                }
            }
        },
        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> - v<%= pkg.version %> */",
                report: "gzip",
                compress: true,
                reserveDOMProperties: true,
                sourceMap: false,
                exportAll: true,
            },
            dist: {
                files: {
                    "dist/js/<%= pkg.name %>.js": ["src/js/<%= pkg.name %>.js"]
                },
            }
        },
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-uglify-es");

    grunt.registerTask("default", ["clean", "less", "cssmin", "uglify"]);
};