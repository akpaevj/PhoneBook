using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Threading.Tasks;

namespace PhoneBook.Models
{
    public class PhoneBookItem
    {
        public string Name { get; set; } = "";
        public string EMail { get; set; } = "";
        public string Phone { get; set; } = "";
        public string MobilePhone { get; set; } = "";

        public PhoneBookItem(SearchResult searchResult)
        {
            Name = GetPropertyValue(searchResult, "name");
            EMail = GetPropertyValue(searchResult, "mail");
            MobilePhone = GetPropertyValue(searchResult, "mobile");
            Phone = GetPropertyValue(searchResult, "telephonenumber");
        }

        private string GetPropertyValue(SearchResult searchResult, string propertyName)
        {
            if (searchResult.Properties.Contains(propertyName))
                return searchResult.Properties[propertyName]?[0]?.ToString();

            return "";
        }

        public bool HasContactsInformation()
        {
            if (string.IsNullOrEmpty(EMail) && string.IsNullOrEmpty(Phone) && string.IsNullOrEmpty(MobilePhone))
                return false;
            else
                return true;
        }
    }
}
