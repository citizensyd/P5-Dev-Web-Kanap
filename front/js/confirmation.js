//Récupération de l'id de la commande pour l'afficher dans la page confirmation
function getCommandId() {
    return new URL(location.href).searchParams.get("orderId");
}

// afficher le numéro de commande dans la page confirmation
let orderId = getCommandId();
document.getElementById('orderId').innerText += `${orderId}`;









