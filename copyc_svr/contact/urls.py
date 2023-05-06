from rest_framework.routers import SimpleRouter
from contact import views


router = SimpleRouter()

router.register(r'category/types', views.CategoryViewSet, 'Category')
router.register(r'', views.ContactViewSet, 'Contact')

urlpatterns = router.urls
