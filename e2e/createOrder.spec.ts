import { test, expect } from '@playwright/test'

async function openmodalWindow(page) {
  await page.locator('[id="692889f16bf770001bfeb4d6"]').click()
  await page.waitForTimeout(2000)
}

async function moveItem2Order(page) {
  const firstItem = page.locator('[id="692889f16bf770001bfeb4cc"]')
  const secondItem = page.locator('[id="692889f16bf770001bfeb4d6"]')
  const orderSpace = page.locator(
    '[class*="burger-constructor__burger_constructor"]'
  )
  await page.waitForTimeout(2000)
  await firstItem.dragTo(orderSpace)
  await page.waitForTimeout(2000)
  await secondItem.dragTo(orderSpace)
  await page.waitForTimeout(2000)
}

test.describe('Тестирование процесса создания заказа', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })
  test('Перетаскиваем ингредиенты в конструктор', async ({
    page,
  }): Promise<void> => {
    await moveItem2Order(page)
    await expect(page.getByText('Оформить заказ')).toBeVisible()
  })

  test('открытие модального окна с описанием ингредиента', async ({
    page,
  }): Promise<void> => {
    await openmodalWindow(page)
    await expect(page.getByText('Детали ингредиента')).toBeVisible()
  })

  test('отображение в модальном окне данных ингредиента', async ({
    page,
  }): Promise<void> => {
    await page.locator('[id="692889f16bf770001bfeb4d6"]').click()
    await page.waitForTimeout(2000)
    await expect(page.getByText('Калории,ккал')).toBeVisible()
    await expect(page.getByText('Белки, г')).toBeVisible()
    await expect(page.getByText('Жиры, г')).toBeVisible()
    await expect(page.getByText('Углеводы, г')).toBeVisible()
  })

  test('закрытие модальных окон при клике на кнопку закрытия', async ({
    page,
  }): Promise<void> => {
    await openmodalWindow(page)
    await page.locator('[class*="modal__closeIcon"]').click()
    await expect(page.getByText('Детали ингредиента')).toBeHidden()
  })

  test('создание заказа', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('accessToken', 'accessTokenValue')
    })

    await moveItem2Order(page)

    await page.route('**/api/orders', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          name: 'Тестовый заказ',
          order: { number: 12345 },
        }),
      })
    })

    await page.getByText('Оформить заказ').click()
    await page.waitForTimeout(2000)

    await expect(page.getByText('12345')).toBeVisible()
  })
})
