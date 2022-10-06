using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Cors;

namespace DAL
{

    [EnableCors(methods: "*", origins: "*", headers: "*")]
    public class CountryDAL
    {
        public static List<country> getAllCountries()
        {
            using (travel_agentEntities travel_agent = new travel_agentEntities())
            {
                return travel_agent.country.ToList();
            }
        }
    }
}
