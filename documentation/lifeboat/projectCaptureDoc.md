# Project Capture Document for Conversion Lifeboat
#### *Author: Levi Stum
#### *Stakeholder(s): Joshua McKinney, Other people
#### *Date: June 10, 2019*

---

## Background

We are getting ready to shut down Brightspace (D2L) but there are a lot of courses with content that did not get transferred to Canvas. This branch/project's purpose is to convert all existing courses to Canvas just in case so that we have all the content that we had on Brightspace before we end our contract with them.

---

## Recap (tl;dr)
A tool to automate the conversion process so that we can convert ALL D2l courses to Canvas.

A.k.a an add-on alternate branch of the current tool to be automatically run without the CLI.

-----

# Requirements

#### Source of Inputs

An array/CSV of Course IDs
<!-- Paragraph of how to get inputs. From who? From where: Slack, email, server...? This also includes user selected options at runtime. How will we know what options to select? For example, in conversion tool, you'd follow the values on the Trello Board. It would also include the steps to get access to the information you need, such as getting added to a Trello Board, or access to a server.

-----
Good: 
    We will know which courses to run it on, because Brother Doe will slack you which sub-account(s) to get the list of courses from, to run the code on.
---
    The inputs will come as a csv from Brother John Doe in an email, upon request. 
---
    Brother Doe will need to add you to his Trello Board so that you can see what needs to be done. Email him so he can give you access to the board. Once you have access, look in the column titled "Ready for Team Josh". Follow the instructions from there.
-----
Poor:
    Ask Brother Doe.
        ^ What am I asking him for? How should I expect to get it from him?
---
    CSV with a list of course IDs.
        ^ This explains what we are getting. This would go in the definition of inputs. We need to know how to get that list.
---
    Trello Board.
        ^ Which Trello Board? How do I get access? What do I do once I am added to the board?
-----
-->
#### Definition of Inputs



<!-- List here a type definition for each input. For example, if it is a CSV define the column names. If it is a JSON, give an example of the JSON structure. If it is user input, what will the user be asked for? 

-----
Good:
    The input will be a CSV with the following column names: "Course_ID" "Course_Code" "SISID"
---
    The input will be a CSV with the columns containing the course id, the course code, and the sisid. I don't know what they are going to be called yet, but those pieces of information will be availible.
---
    The input will be a JSON object that looks like:
    {
        "Course_ID": "",
        "Course_Code": "",
        "SISID": ""
    }
    It is compatible with inquierer answer objects.
-----
Poor:
    The input will be a csv.
        ^ What information is on the csv?
---
    The input will be on the trello board.
        ^ That's where the information lives. We need to know what information the program will consume, and what it looks like.
-----
 -->

---


#### Destination of Outputs

<!-- Paragraph where/who to send outputs. To who? To where: Email, server, directly to LMS...? It would also include the steps to get access to the locations you need, such as getting added to a Trello Board, or access to a server, or the LMS. -->

#### Definition of Outputs

<!-- List here a type definition for each output? For example, if the changes are directly to the LMS, list all changes that occur. If it is a CSV define the column names. If it is a JSON, give an example of the JSON structure. -->

---

#### General Requirements
<!-- This tool shall help Brother John Doe and his students...TODO -->
<!-- TODO: -->

---

#### User Interface Type

<!-- CLI with Flags, CLI With Prompt, Web Page, Server, Library, etc -->

<!-- What are the flags, what are Major Questions, Images of UX/UI Design. -->

-----
-----

# Communication Plan

### Timeline

<!-- Include Milestone List here with Deadlines and try to make each milestone a minimum viable product
- Milestone 1: Finish Design (3/19)
- Milestone 2: Build Core logic to search for words in syllabi (3/22)
- Milestone 3: Connect inputs to core logic and set up outputs (3/25)
- Milestone 4: Deliver the project (3/26)
This will probably be overkill for small projects -->

### Best Mode of Contact
<!-- Email, Phone Number, Slack, etc. -->

### Next Meeting
<!-- e.g. May 4th, 2019 -->

### Action Items
<!-- Recap Meeting -->

#### TechOps

#### Stakeholder


-----

#### *Approved By:*
#### *Approval Date:*