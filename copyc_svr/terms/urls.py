from rest_framework.routers import SimpleRouter
from terms import views


router = SimpleRouter()

router.register(r'', views.TermsViewSet, 'Terms')

urlpatterns = router.urls
