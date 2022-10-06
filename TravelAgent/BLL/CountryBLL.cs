using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class CountryBLL
    {
        public static List<DTO.CountryDTO> getAllCountries()
        {
            return Convertors.CountryConvertor.convertCountryToDtoList(DAL.CountryDAL.getAllCountries());
        }
    }
}
