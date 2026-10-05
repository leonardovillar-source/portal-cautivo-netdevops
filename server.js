const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const usersDB = {
    "admin": { password: "adminPassword123", vlan: "VLAN_ADMIN_10", redirectUrl: "/admin-dashboard" },
    "invitado": { password: "guestPassword123", vlan: "VLAN_GUEST_20", redirectUrl: "/guest-dashboard" }
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = usersDB[username];

    if (user && user.password === password) {
        console.log(`[NetDevOps] Éxito: Usuario '${username}' autenticado. Asignando a ${user.vlan}`);
        return res.status(200).json({
            success: true,
            message: `Autenticación exitosa. Redirigido a ${user.vlan}`,
            vlanAssigned: user.vlan,
            redirectUrl: user.redirectUrl
        });
    }

    console.log(`[NetDevOps] Fallo: Credenciales inválidas para '${username}'`);
    return res.status(401).json({ success: false, message: "Credenciales inválidas" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Portal Cautivo corriendo en el puerto ${PORT}`);
});