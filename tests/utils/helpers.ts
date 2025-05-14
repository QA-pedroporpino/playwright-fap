import fs from 'fs';

export const COUNTER_FILE = 'tests/profile_counter.txt';

export function getNextProfileNumber(): number {
  let num = 1;
  if (fs.existsSync(COUNTER_FILE)) {
    num = parseInt(fs.readFileSync(COUNTER_FILE, 'utf-8'), 10) + 1;
  }
  fs.writeFileSync(COUNTER_FILE, num.toString());
  return num;
}

export async function takeScreenshot(page: any, name: string): Promise<void> {
  await page.screenshot({ path: `./test-results/${name}.png`, fullPage: true });
}

export async function logError(page: any, error: any, context: string): Promise<void> {
  console.log(`Erro durante ${context}:`, error);
  await takeScreenshot(page, `error-${context.toLowerCase().replace(/\s+/g, '-')}`);
} 