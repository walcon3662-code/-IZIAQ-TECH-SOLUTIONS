from django.contrib import admin
from .models import Category, Product, Service, Order, Cart, CartItem

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Service)
admin.site.register(Order)
admin.site.register(Cart)
admin.site.register(CartItem)