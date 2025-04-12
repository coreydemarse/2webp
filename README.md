# 2webp

A simple image converter for web developers.

Convert images asyncronously in bulk using Bun/Sharp.


## Install (global)

Install 2webp globally using NPM
```bash
bun add -g 2webp
```

On Linux - make sure you have libvips
```bash
sudo apt-get install libvips-dev
```

## How to Use

When converting images 2webp will automatically batch and convert images asyncrounously.
You can convert large folders of images safely with 2webp.

### Syntax

```bash
2webp {dir/file} {--output=/example} {--format=png/jpeg/gif/tiff/webp}
```

### Examples

To convert all the images in the current directory to webp

The output is in current directory

```bash
2webp .
```

Specify output directory, convert all images in current dir
```bash
2webp . --output=./output
```

Convert all images in current dir to png
```bash
2webp . --format=png
```

## Development

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

#

This project was created using Bun.

[Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
