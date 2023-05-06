from rest_framework.routers import SimpleRouter
from notice import views


router = SimpleRouter()

router.register(r'', views.NoticeViewSet, 'Notice')

urlpatterns = router.urls
