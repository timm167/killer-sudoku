# Killer Sudoku Solver app

## How to use

Use the link https://timm167.github.io/killer-sudoku/ to access.

For local deployment see instructions below.

Click a cell to add a value to it. 

To add the 'killer' Sudoku boxes, click killer mode. 

In the app 'box' refers to the boxes in killer Sudoku that must add up to a declared Sum.

You can create a box using New Box button. 

You can declare it's sum using Set Box Total. 

You can toggle the color before creating a box with toggle Color.

Once every cell is in a box, and you have set values for the cells you wish to declare, press Solve Puzzle to solve it.

If it's not solvable, it will alert you. 

To test without building your own Sudoku, just reset and press Test Puzzle then Solve Puzzle.

## Why I built it

I built this project for two main reasons. 
1) I love Killer Sudoku
2) I wanted to learn Depth-First-Search

This was my first time using Flask, Deploying in Render, Building recursive algorithms in a project, Managing complex state without React, and dealing with a bunch of other challenges I didn't anticipate.

It's unfinished due to a number of minor bugs in the frontend and a backend that could find solutions in much fewer recursions. I am sure a simpler solution was possible but the point was to learn recursions :)

I also wanted to challenge myself to build the frontend without React or other frameworks. The code is far from optimized on the frontend and can be improved with simpler data structures. Improvements to come!

## About

A RESTful API for solving Killer Sudoku puzzles. This project provides a way to send a Sudoku puzzle in a specific format (grid and boxes) and receive a solution (if solvable) or an error message. 

It uses Flask as the backend framework and should currently be deployed on Render.

The backend uses a recursive depth-first-search to try different combinations with particular constraints.

The frontend has it's own logic to validate user inputs on a basic level. The call to solve the sudoku activate the intensive logic in python.

Feel free to make pull requests, I will be making improvements over time. 

## Features
- Reactive front end (not React)
- Lets you create a killer Sudoku puzzle within Killer Sudoku Rules and send it to the server
- Server solves Killer Sudoku puzzles
- Returns solvability status and solution grid
- CORS enabled for cross-origin requests

## Tech Stack

### Backend
- Python 3.x
- Flask
- Flask-CORS
- Gunicorn (for production deployment)
- Render (for deployment)

### Frontend
- JavaScript

## Deployment 

I will add instructions soon

## Structure

I will add structure soon
