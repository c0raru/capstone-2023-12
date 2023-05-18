from rest_framework.routers import SimpleRouter
from product import views


router = SimpleRouter()

router.register(r'brand', views.BrandViewSet, 'Brand')
router.register(r'category', views.CategoryViewSet, 'Category')
router.register(r'product', views.ProductViewSet, 'Product')
router.register(r'like', views.LikeViewSet, 'Like')
router.register(r'viewhistory', views.ViewHistoryViewSet, 'ViewHistory')
router.register(r'cart', views.CartViewSet, 'Cart')

urlpatterns = router.urls
