import { Locator } from '@playwright/test';

export async function getListboxOptionContent(listbox: Locator) {
  return listbox.getByRole('option').allTextContents();
}
