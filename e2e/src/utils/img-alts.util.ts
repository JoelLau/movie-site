import { Locator } from '@playwright/test';

export async function getImageAlts(locator: Locator) {
  return await locator.evaluateAll((list) =>
    list.map((element) => element.querySelector('img')?.getAttribute('alt')),
  );
}
