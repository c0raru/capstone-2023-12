from rest_framework.routers import SimpleRouter
from image import views


router = SimpleRouter()

router.register(r'category', views.CategoryViewSet, 'Category')
router.register(r'image', views.ProductViewSet, 'Image')
router.register(r'imagedetail', views.ProductViewSet, 'ImageDetail')
router.register(r'like', views.LikeViewSet, 'Like')
router.register(r'viewhistory', views.ViewHistoryViewSet, 'ViewHistory')

urlpatterns = router.urls