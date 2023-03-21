## NOTES

-----------
INSTRUCTIONS:
Use this markdown file to keep track of open questions/challenges from this week's assignment.
- What did you have trouble solving?
- What went easier than expected?
- What, if anything, is currently blocking you?

I tried to form legend for the map circles; however, it kept giving me errors. Not sure what went wrong but I tried to append individual variable as follow:

var svg = d3.select("#container")
    svg.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "#702963")
    svg.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "#DAF7A6")
    svg.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "#FFC300")
    svg.append("text").attr("x", 220).attr("y", 130).text("zero change").style("font-size", "15px").attr("alignment-baseline","bottom")
    svg.append("text").attr("x", 220).attr("y", 160).text("positive change").style("font-size", "15px").attr("alignment-baseline","bottom")
    svg.append("text").attr("x", 220).attr("y", 160).text("negative change").style("font-size", "15px").attr("alignment-baseline","bottom")


Sometimes it helps to formulate what you understood and where you got stuck in order to move forward. Feel free to include `code snippets`, `screenshots`, and `error message text` here as well.

If you find you're not able complete this week's assignment, reflecting on where you are getting stuck here will help you get full credit for this week's tutorial

------------
