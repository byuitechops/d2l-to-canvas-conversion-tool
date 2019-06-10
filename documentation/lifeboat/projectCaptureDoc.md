# Project Capture Document for Conversion Lifeboat
#### *Author: Levi Stum
#### *Stakeholder(s): Joshua McKinney, Other people
#### *Date: June 10, 2019*

---

## Background

We are getting ready to shut down Brightspace (D2L) but there are a lot of campus courses with content that did not get transferred to Canvas. This branch/project's purpose is to convert all existing courses to Canvas just in case so that we have all the content that we had on Brightspace before we end our contract with them.

---

## Recap (tl;dr)
A tool to automate the conversion process so that we can convert ALL D2l courses to Canvas.

A.k.a an add-on alternate branch of the current tool to be automatically run without the CLI.

-----

# Requirements

#### Source of Inputs

An array/CSV of Course IDs and Course Data

#### Definition of Inputs

CSV containing these fields:
SISID, OU, Course Name, Instructor Email, Instructor Name
List of course IDs - CSV containing all Course IDs (D2L/Brightspace IDs)

---

#### Destination of Outputs

Course successfully converted to Canvas
Report of courses successfully converted.

#### Definition of Outputs

Course successfully converted - Course exists in Canvas
Report - CSV containing each course and it's new URL

---

#### General Requirements

This tool will automate the conversion process in order to convert all Campus D2L courses to Canvas.
They will be put into the "Lifeboat" subaccount (subaccount ID is 260)

---

#### User Interface Type

CLI tool that will be run once (hopefully)

-----

# Communication Plan

### Timeline

- Get test environment set up (dummy csv input, dummy csv output, proper place to put new courses, etc.)
- Test manually, then begin automating
- Work on getting the correct course list (CSV)
- Run it / test it

### Best Mode of Contact
Slack, In-person, etc.

### Next Meeting
<!-- e.g. May 4th, 2019 -->

### Action Items
<!-- Recap Meeting -->

#### TechOps

#### Stakeholder


-----

#### *Approved By: *
#### *Approval Date: *
