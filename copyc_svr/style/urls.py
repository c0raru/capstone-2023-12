from rest_framework.routers import SimpleRouter
from style import views


router = SimpleRouter()

router.register(r'', views.RequestViewSet, 'Request')

urlpatterns = router.urls
