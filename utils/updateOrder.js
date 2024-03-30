export const viewOrderStatus = (orderId, router,userId) => {
    router.push(`/user/${userId}/orders/${orderId}`)
}

export const updatePaymentHandler = async (orderId, isPaid, router) => {

    if (!orderId) return alert(orderId);


    try {
        const response = await fetch(`/api/orders/${orderId}`, {
            method: "PATCH",
            body: JSON.stringify({
                isPaid: !isPaid,

                orderId
            }),

        });

        if (response.ok) {
            router.refresh();
            console.log('order status updated');
        }
    } catch (error) {
        console.log(error);
    } finally {
        // console.log('finally');
    }
}
export const updateDeliveryHandler = async (orderId, isDelivered, router) => {
    if (!orderId) return alert(orderId);


    try {
        const response = await fetch(`/api/orders/${orderId}`, {
            method: "PATCH",
            body: JSON.stringify({

                isDelivered: !isDelivered,
                orderId
            }),

        });

        if (response.ok) {
            router.refresh();
            console.log('order status updated');
        }
    } catch (error) {
        console.log(error);
    } finally {
        // console.log('finally');
    }
}