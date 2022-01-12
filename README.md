# Plain Old JavaScript SAS Viya App

This is a very simple example of using OAuth antentication for
developing SAS applications; I stress the "simple" since there is no
other advantage over [the ReactJS application
example](https://communities.sas.com/t5/SAS-Communities-Library/SAS-Authentication-for-ReactJS-based-applications/ta-p/776687)
in which this project is based on.

On top of not using Reactjs (just to focus on the bare minimum) there
is another difference: the goal of this app, currently, is to obtain a
token using existing credentials, and fail if they don't exist. This
means that there is no logic for opening up the SASLogon popup, and
also no use of a callback function.

