$(document).ready(function() {
    let cart = [];

    $('.add-to-cart').click(function() {
        const item = $(this).closest('.clothing-item');
        const name = item.data('name');
        const price = item.data('price');

        cart.push({ name, price });
        updateCart();
    });

    function updateCart() {
        const cartList = $('#cart');
        cartList.empty();
        let total = 0;

        cart.forEach((item, index) => {
            cartList.append(`
                <li>
                    ${item.name} - $${item.price}
                    <button class="remove-from-cart" data-index="${index}">Remove</button>
                </li>
            `);
            total += item.price;
        });

        $('#total').text(`Total: $${total}`);
        
        // Show or hide the Buy button
        $('#buy-button').toggle(cart.length > 0);
    }

    $(document).on('click', '.remove-from-cart', function() {
        const index = $(this).data('index');
        cart.splice(index, 1);
        updateCart();
    });

    $('#buy-button').click(function() {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        $('#thank-you-message').text(`Thank you for your purchase of $${total}!`).show();
        
        // Clear the cart
        cart = [];
        updateCart();
        
        // Hide the message after a few seconds
        setTimeout(() => {
            $('#thank-you-message').hide();
        }, 3000);
    });
});
