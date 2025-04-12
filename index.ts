import fs from "fs";
import path from "path";
import sharp from "sharp";

// Function to convert an image to WebP
const convertToWebP = async (
  inputPath: string,
  outputPath: string,
  format: string,
) => {
  try {
    switch (format) {
      case "png":
        await sharp(inputPath)
          .png() // You can adjust the quality
          .toFile(outputPath);
        break;
      case "webp":
        await sharp(inputPath)
          .webp({ quality: 100 }) // You can adjust the quality
          .toFile(outputPath);
        break;
      case "gif":
        await sharp(inputPath)
          .gif() // You can adjust the quality
          .toFile(outputPath);
        break;
      case "jpeg":
        await sharp(inputPath)
          .jpeg() // You can adjust the quality
          .toFile(outputPath);
        break;
      case "tiff":
        await sharp(inputPath)
          .tiff() // You can adjust the quality
          .toFile(outputPath);
        break;
    }

    console.log(`Converted: ${inputPath} -> ${outputPath}`);
  } catch (err) {
    console.error(`Error converting ${inputPath}:`, err);
  }
};

// Function to batch process files
const batchProcess = async (
  files: string[],
  inputDir: string,
  outputDir: string,
  batchSize: number,
  format: string,
) => {
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    const batchPromises = batch.map((file) => {
      const filePath = path.join(inputDir, file);
      if (/\.(jpg|jpeg|png|gif|bmp|tiff|svg)$/i.test(file)) {
        const outputFilePath = path.join(
          outputDir,
          `${path.parse(file).name}.${format}`,
        );
        return convertToWebP(filePath, outputFilePath, format);
      }
    });

    // Wait for all promises in the batch to finish
    await Promise.all(batchPromises);
    //console.log(`Processed batch: ${i / batchSize + 1}`);
  }
};

// Process a folder or a single file
const processImages = async (
  input: string,
  outputDir: string,
  batchSize: number,
  format: string,
) => {
  if (fs.statSync(input).isDirectory()) {
    // Process all files in the folder
    const files = await fs.promises.readdir(input);
    await batchProcess(files, input, outputDir, batchSize, format);
  } else if (/\.(jpg|jpeg|png|gif|bmp|tiff|svg)$/i.test(input)) {
    // Process a single file
    const outputFilePath = path.join(
      outputDir,
      `${path.parse(input).name}.${format}`,
    );
    await convertToWebP(input, outputFilePath, format);
  } else {
    console.log(
      "Invalid file type. Please provide a JPG, JPEG, PNG, GIF, or SVG file.",
    );
  }
};

// Ensure the output directory exists
const ensureDirSync = (dirPath: string) => {
  try {
    const stat = fs.statSync(dirPath);
    if (!stat.isDirectory()) {
      console.error(`Error: ${dirPath} is not a valid directory.`);
      process.exit(1); // Exit process with error code
    }
  } catch (err) {
    console.log(`Output directory does not exist. Creating: ${dirPath}`);
    try {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Directory created: ${dirPath}`);
    } catch (err) {
      console.error(`Error creating output directory: ${dirPath}`);
      process.exit(1); // Exit process with error code
    }
  }
};

// Get arguments from the command line
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Please specify a folder or file.");
} else {
  const input = args[0];
  let outputDir = "."; // Default to current directory if no output is specified
  const batchSize = 20; // Default batch size to 20, can be adjusted
  let format = "webp";

  for (const arg of args) {
    if (arg.startsWith("--output=")) {
      outputDir = arg.slice("--output=".length);
    } else if (arg.startsWith("--format=")) {
      format = arg.slice("--format=".length);

      if (!["webp", "jpeg", "png", "gif", "tiff"].includes(format)) {
        console.error(
          `Invalid format: ${format}. Supported formats are: webp, jpeg, png, tiff, gif.`,
        );
        process.exit(1);
      }
    }
  }

  // Ensure the output directory exists
  ensureDirSync(outputDir);

  if (input) {
    processImages(input, outputDir, batchSize, format);
  }
}
