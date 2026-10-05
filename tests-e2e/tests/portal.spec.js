const { test, expect } = require('@playwright/test');

test('Validar autenticación y asignación de VLAN de Administrador', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.fill('#username', 'admin');
    await page.fill('#password', 'adminPassword123');
    await page.click('#login-btn');

    // Comprobamos que aparezca la VLAN de administración en pantalla
    await expect(page.locator('#welcome-message')).toContainText('VLAN_ADMIN_10');
});