#!/usr/bin/env node
import { cli } from "../index.js";

cli().catch((err) => {
  console.error(err);
  process.exit(1);
});
