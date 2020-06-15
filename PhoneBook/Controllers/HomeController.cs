using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using System.DirectoryServices.ActiveDirectory;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters.Xml;
using Microsoft.Extensions.Logging;
using PhoneBook.Models;

namespace PhoneBook.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult SearchPhoneBookItems(string term = "")
        {
            var data = new List<PhoneBookItem>();

            var filter = "(&(objectCategory=person)(objectclass=user)";

            if (!string.IsNullOrEmpty(term))
                filter += $"(name=*{term}*)";

            filter += ")";

            var entry = Domain.GetCurrentDomain().GetDirectoryEntry();

            var searcher = new DirectorySearcher(entry, filter);
            searcher.PropertiesToLoad.Add("name");
            searcher.PropertiesToLoad.Add("mobile");
            searcher.PropertiesToLoad.Add("mail");
            searcher.PropertiesToLoad.Add("telephonenumber");

            var result = searcher.FindAll();

            foreach (SearchResult searchResult in result)
            {
                var user = new PhoneBookItem(searchResult);

                if (user.HasContactsInformation())
                    data.Add(user);
            }

            data = data.OrderBy(c => c.Name).ToList();

            return Json(data);
        }
    }
}
