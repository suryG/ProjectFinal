using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Convertors
{
     class CountryConvertor
    {
        public static DAL.country convertCountryToDal(DTO.CountryDTO countryDTO)
        {
            return new DAL.country()
            {
                countryId =countryDTO.countryId,
                countryKey = countryDTO.countryKey,
                countryDisplayName = countryDTO.countryDisplayName,
            };/*DTO TO DALL & DALL TO DTO*/

        }
        /*ממיר אוביקט של אסקיאל להצגה למשתמש-(לאנגולר)*/
        public static DTO.CountryDTO convertCountryToDto(DAL.country countryDAL)
        {
            return new DTO.CountryDTO()
            {
                countryId = countryDAL.countryId,
                countryKey = countryDAL.countryKey,
                countryDisplayName = countryDAL.countryDisplayName,
               
            };/*DTO TO DALL & DALL TO DTO*/
        }
        public static List<DTO.CountryDTO> convertCountryToDtoList(List<DAL.country> countriesDAL)
        {
            var listCountry = new List<DTO.CountryDTO>();
            foreach (var country in countriesDAL)
            {
                listCountry.Add(convertCountryToDto(country));
            }
            return listCountry;
        }

    }
}
