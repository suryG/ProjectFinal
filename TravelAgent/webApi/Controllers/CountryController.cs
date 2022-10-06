using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace webApi.Controllers
{
    [EnableCors(origins: "*", methods: "*", headers: "*")]
    [RoutePrefix("country")]
    public class CountryController : ApiController
    {
        // GET: Country
        [HttpGet]
        [Route("getAllCountries")]
        public List<DTO.CountryDTO> getAllCountries()
        {
            return BLL.CountryBLL.getAllCountries();
        }
    }
}
