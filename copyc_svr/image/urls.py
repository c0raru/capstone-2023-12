from rest_framework.routers import SimpleRouter
from image import views


router = SimpleRouter()

router.register(r'category', views.CategoryViewSet, 'Category')
router.register(r'product', views.ProductViewSet, 'Product')
router.register(r'like', views.LikeViewSet, 'Like')
router.register(r'viewhistory', views.ViewHistoryViewSet, 'ViewHistory')

urlpatterns = router.urls