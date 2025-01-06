from odoo import http
from odoo.http import request

class ShopEnmasys(http.Controller):
    @http.route('/shop', auth='public', website=True, type="http")
    def shop_page(self, **kw):
        template = "enmasys_multiple_vendor.multiple_vendor_shop_body"
        return request.render(template)
