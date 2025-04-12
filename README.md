# 2webp

A simple image converter for web developers.

Convert images asyncronously in bulk using Bun/Sharp.

## Install (global)

```bash
bun install -g 2webp
```

## How to Use

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

This project was created using Bun. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
