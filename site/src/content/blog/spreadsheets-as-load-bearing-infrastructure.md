---
title: "Spreadsheets as load-bearing infrastructure"
description: "Most operational software gets commissioned the day someone realizes a spreadsheet is doing a job nobody can explain. Here's what to do about it."
pubDate: 2026-04-12
author: "Jay Smith"
tags: ["operations", "internal-tools", "discovery"]
kind: "essay"
heroSet: "ops"
draft: false
---

There's a pattern I see in almost every operations-led engagement. Somewhere in the business, a spreadsheet has quietly become the system of record for something important. Lead routing. Inventory. Vendor approvals. Shift coverage. Commission calculations. The spreadsheet works - sort of - but everyone tiptoes around it, because if it breaks, three people in three departments will lose half a day.

That spreadsheet is doing real work. The question is whether anyone has ever sat down and written out what work, exactly.

## The discovery question that earns its keep

Before designing the replacement, the most expensive thing you can do is build straight from the spreadsheet's columns. Columns are the *artifact* of the workflow, not the workflow itself. The columns reflect whatever the last person to edit it was thinking. They almost never describe what the operation actually requires.

The question worth asking is: **what decisions does this spreadsheet support, and who is making them?**

Once you start writing down the answers, you usually find:

- Half the columns exist because of one specific incident two years ago
- One column is doing the job of three (a free-text field that everyone has agreed means different things in different rows)
- The "important" tab everyone references is being kept in sync by a single person manually copy-pasting from another tab every Monday morning
- There is a parallel system - usually a shared inbox or a Slack channel - that holds half the context the spreadsheet doesn't

## What the replacement actually needs to do

It needs to capture the decisions, not the columns. Concretely:

1. **Make the work visible.** Whoever holds the spreadsheet today is currently the bottleneck. The tool should make their work legible to everyone else, not just digitize it.
2. **Encode the rules.** The conditional formatting, the manual filters, the "if this column is X then check column Y" - those are the rules nobody documented. The new tool gets to make them explicit.
3. **Survive the next variation.** Operations always invents a new edge case. The replacement has to bend without breaking, which usually means modeling the data slightly more abstractly than the spreadsheet did.

This is the part most "build us a custom tool" engagements get wrong. They turn the spreadsheet into a CRUD interface and call it done. Two months later, the team is back to using the spreadsheet because the new tool can't handle the edge case that came up last Tuesday.

## The 10x rule of thumb

If the replacement doesn't make the operator's Monday easier in three concrete ways they can name, it hasn't earned the budget yet. The point of internal tools isn't to look more modern than the spreadsheet - it's to make the operation more legible to leadership, more durable under turnover, and less dependent on the one person who knows where the formulas are.

That's the bar. Anything less and you've just bought yourself a more expensive spreadsheet.
