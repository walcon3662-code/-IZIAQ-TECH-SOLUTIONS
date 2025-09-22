from django.urls import path,include
from . import views
urlpatterns = [
    path('', views.home ,name='home'),
    path('products/', views.products ,name='products'),
    path('product_dec/', views.product_dec ,name='product_dec'),
    path('about-us/', views.about_us ,name='about-us'),
    path('contact/', views.contact ,name='contact'),
    path('view_cart/', views.view_cart ,name='view_cart'),
    path('service/', views.service ,name='service'),
    path('add_to_cart/<int:product_id>/', views.add_to_cart ,name='add_to_cart'),

    path('cart/delete/<int:cart_item_id>/', views.delete_from_cart, name='delete_from_cart'),
    
]

