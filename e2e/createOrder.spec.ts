import { test, expect } from '@playwright/test'

const IdConst = '692889f16bf770001bfeb4d6'

async function openModalWindow(page) {
  await page.locator(`[id="${IdConst}"]`).click()
  await page.waitForTimeout(2000)
}

async function moveItem2Order(page) {
  const firstItem = page.locator('[id="692889f16bf770001bfeb4cc"]')
  const secondItem = page.locator(`[id="${IdConst}"]`)
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
    await page.routeFromHAR('./e2e/hars/ingredients.har', {
      url: '**api/ingredients',
    })
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
    await openModalWindow(page)
    await expect(page.getByText('Детали ингредиента')).toBeVisible()
  })

  test('отображение в модальном окне данных ингредиента', async ({
    page,
  }): Promise<void> => {
    await page.locator(`[id="${IdConst}"]`).click()
    await page.waitForTimeout(2000)
    await expect(page.getByText('Калории,ккал')).toBeVisible()
    await expect(page.getByText('Белки, г')).toBeVisible()
    await expect(page.getByText('Жиры, г')).toBeVisible()
    await expect(page.getByText('Углеводы, г')).toBeVisible()
  })

  test('закрытие модальных окон при клике на кнопку закрытия', async ({
    page,
  }): Promise<void> => {
    await openModalWindow(page)
    await page.locator('[class*="modal__closeIcon"]').click()
    await expect(page.getByText('Детали ингредиента')).toBeHidden()
  })

  test('создание заказа', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('accessToken', 'accessTokenValue')
    })

    await page.routeFromHAR('./e2e/hars/createOrder.har', {
      url: '**api/orders',
    })

    await moveItem2Order(page)
    await page.getByText('Оформить заказ').click()
    await page.waitForTimeout(2000)

    await expect(page.getByText('идентификатор заказа')).toBeVisible()
  })
})
