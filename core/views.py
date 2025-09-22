from django.shortcuts import render, redirect, get_object_or_404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .models import Product, Cart, CartItem
def get_cart_item_count(request):
    cart_id = request.session.get('cart_id', None)
    if cart_id:
        cart = Cart.objects.filter(id=cart_id).first()
        if cart:
            return sum(item.quantity for item in CartItem.objects.filter(cart=cart))
    return 0

def home(request):
    item_count = get_cart_item_count(request)
    return render(request, 'index.html', {'item_count': item_count})

def about_us(request):
    item_count = get_cart_item_count(request)
    return render(request, 'about_us.html', {'item_count': item_count})

def product_dec(request):
    item_count = get_cart_item_count(request)
    return render(request, 'product_dec.html', {'item_count': item_count})

def cart(request):
    item_count = get_cart_item_count(request)
    return render(request, 'cart.html', {'item_count': item_count})

def service(request):
    item_count = get_cart_item_count(request)
    return render(request, 'service.html', {'item_count': item_count})

def contact(request):
    item_count = get_cart_item_count(request)
    return render(request, 'contact.html', {'item_count': item_count})

def products(request):
    products = Product.objects.all()
    
    
    paginator = Paginator(products, 3)  #added pagination
    page_number = request.GET.get('page')
    try:
        page_obj = paginator.page(page_number)
    except PageNotAnInteger:
        page_obj = paginator.page(1)
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)

    
    item_count = get_cart_item_count(request)

    return render(request, 'product_list.html', {'page_obj': page_obj, 'item_count': item_count})

def view_cart(request):
    item_count = get_cart_item_count(request)
    cart = Cart.objects.get(id=request.session.get('cart_id', None))
    items = CartItem.objects.filter(cart=cart)
    return render(request, 'view_cart.html', {'items': items, 'item_count': item_count})

def add_to_cart(request, product_id):
    product = Product.objects.get(id=product_id)
    cart, created = Cart.objects.get_or_create(id=request.session.get('cart_id', None))
    
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    
    if not created:
        cart_item.quantity += 1

    cart_item.save()
    request.session['cart_id'] = cart.id
    return redirect('products')


def delete_from_cart(request, cart_item_id):
    # Get the CartItem object or return a 404 error if not found
    cart_item = get_object_or_404(CartItem, id=cart_item_id)

    # Delete the CartItem
    cart_item.delete()

    # Optionally, you can redirect to the cart view or any other page
    return redirect('view_cart')  # Assuming 'view_cart' is the name of your cart view 

'''
def checkout(request):
    cart = Cart.objects.get(id=request.session.get('cart_id', None))
    items = CartItem.objects.filter(cart=cart)

    if request.method == 'POST':
        # Handle payment processing here
        return redirect('success_url')

    return render(request, 'checkout.html', {'items': items})

'''