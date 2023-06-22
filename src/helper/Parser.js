import {load} from "cheerio";

class Parser {
    parseMyBids(data) {
        const $ = load(data);
        const myBids = [];
        let bid = {};
        $('.row .form-group').each((_, element) => {
            const label = $(element).find('label').text();
            switch (label.trim()) {
                case 'Project:':
                    if (Object.keys(bid).length !== 0) {
                        myBids.push(bid);
                    }
                    bid = {}; // reset the bid object
                    bid.project = $(element).find('.form-control-static > a').text().trim();
                    break;
                case 'Project Status:':
                    bid.projectStatus = $(element).find('.label').text().trim();
                    break;
                case 'Worker:':
                    bid.worker = $(element).find('.form-control-static > a').text().trim();
                    break;
                case 'Status:':
                    bid.status = $(element).find('.label').text().trim();
                    break;
                case 'Shortlisted:':
                    bid.shortlisted = $(element).find('.fa').next().text().trim();
                    break;
                case 'Date:':
                    bid.date = $(element).find('.form-control-static').text().trim();
                    break;
                case 'Amount:':
                    bid.amount = $(element).find('.form-control-static').text().trim();
                    break;
                case 'Message:':
                    bid.message = $(element).find('.form-control-static > p').text().trim();
                    break;
                case 'Attachments:':
                    bid.attachments = $(element).find('.form-control-static').text().trim();
                    break;
            }
        });
        // Push the last bid
        if (Object.keys(bid).length !== 0) {
            myBids.push(bid);
        }
        return myBids;
    }

    getUser(data) {
        try {
            const $ = load(data);
            const user = $('a > span.username').text();
            const notifcount = $('#notifcount').text();
            return {
                user : user,
                notifcount : notifcount
            }
        } catch (error) {
            return null;
        }
    }

    getNewProject(data){
        const $ = load(data);
         const projects = [];

      $('#project .project-entry').each((i, el) => {
         const project = {
           img: $(el).find('img').attr('src'),
           link: $(el).find('h3 a').attr('href'),
           title: $(el).find('h3 a').text(),
           priceRange: $(el).find('p .pull-right').text(),
            owner: $(el).find('p').contents().filter((i, el) => el.nodeType === 3).text().split(':')[1].split('\n')[0].trim(),
           deadline: $(el).find('p').contents().filter((i, el) => el.nodeType === 3).text().split(':')[2].trim(),
      };
         projects.push(project);
         });
         return projects;
    }

 searchProject(data){
    const $ = load(data);
    let projects = [];

    $('.row').each(function(i, el) {
        // Ensure it's a project row, not a button or separator row
        if($(this).find('h2').length > 0) {
          let project = {};
      
          // Project owner details
          project.owner = {};
          project.owner.imageUrl = $(this).find('.media-object').attr('src');
          project.owner.username = $(this).find('.short-username').text().trim();
          project.owner.url = $(this).find('.short-username').attr('href');
          project.owner.rating = $(this).find('.align-left img').length;
          project.owner.completedProjects = $(this).find('.fa-circle').nextAll().eq(1).text().trim();
      
          // Project details
          project.title = $(this).find('h2 a').text().trim();
          project.url = $(this).find('h2 a').attr('href');
          project.description = $(this).find('p').eq(0).text().trim();
      
          // Project tags
          project.tags = [];
          $(this).find('.tag').each(function(i, el) {
            project.tags.push($(this).text().trim());
          });
      
          // Project budget, dates and status
          let text = $(this).find('.align-left').text();
          project.budget = text.match(/Rp (\d{1,3}(?:,\d{3})* - \d{1,3}(?:,\d{3})*)/g)[0];
          project.publishedDate =text.match(/(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2} WIB)/g)[0];
          project.selectDeadline = text.match(/(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2} WIB)/g)[1];
          projects.push(project);
        }
      });
    
    return projects;
}

}

export default Parser;