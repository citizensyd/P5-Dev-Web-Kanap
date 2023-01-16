function getCommandId() {
    return new URL(location.href).searchParams.get("orderId");
}
let orderId = getCommandId();
console.log(orderId);
document.getElementById('orderId').innerText += `${orderId}`;