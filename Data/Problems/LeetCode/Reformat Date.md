# 1507. Reformat Date

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reformat-date](https://leetcode.com/problems/reformat-date)
**Companies:** Adobe, Expedia, Oracle, Twilio

---

## Problem Description
Given a `date` string in the form `Day Month Year`, where:

- `Day` is in the set `{"1st", "2nd", "3rd", "4th", ..., "30th", "31st"}`.
- `Month` is in the set `{"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"}`.
- `Year` is in the range `[1900, 2100]`.

Convert the date string to the format `YYYY-MM-DD`, where:

- `YYYY` denotes the 4 digit year.
- `MM` denotes the 2 digit month.
- `DD` denotes the 2 digit day.

**Constraints:**

- The given dates are guaranteed to be valid, so no error handling is necessary.

## Examples

```
Example 1:
  Input: date = "20th Oct 2052"
  Output: "2052-10-20"
```

```
Example 2:
  Input: date = "6th Jun 1933"
  Output: "1933-06-06"
```

```
Example 3:
  Input: date = "26th May 1960"
  Output: "1960-05-26"
```

## Approach
Use a lookup table for month abbreviations, strip the ordinal suffix from the day, zero-pad day and month, and concatenate year, month, and day.

```text
FUNCTION ReformatDate(dateString):
    // month abbreviation to number map
    SET monthMap ← {"Jan":"01","Feb":"02","Mar":"03","Apr":"04","May":"05","Jun":"06",
                    "Jul":"07","Aug":"08","Sep":"09","Oct":"10","Nov":"11","Dec":"12"}
    SET parts ← SPLIT(dateString, " ")
    // remove suffix (st, nd, rd, th) and pad day
    SET dayRaw ← parts[0]
    SET day ← SUBSTRING(dayRaw, 0, LENGTH(dayRaw)-2)
    SET day ← ZEROPAD(day, 2)
    SET month ← monthMap[parts[1]]
    SET year ← parts[2]
    RETURN CONCAT(year, "-", month, "-", day)
```

## Walkthrough
For "20th Oct 2052":
1. Split → ["20th", "Oct", "2052"]
2. Day: "20th" → "20" → "20"
3. Month: "Oct" → "10"
4. Year: "2052"
5. Result: "2052-10-20"

## Complexity Analysis
Time: O(1) – constant work on three parts.
Space: O(1) – fixed-size map and output string.

## Follow-Up Questions
* How would you handle different locale date formats?
* Can you extend the solution to support full month names?
* What if the input contains invalid dates?

## Key Takeaway
Strip the ordinal suffix, map month abbreviations, and zero-pad components to build the ISO date string.

```
FUNCTION reformatDate(date):
    months = {"Jan":"01","Feb":"02","Mar":"03","Apr":"04","May":"05","Jun":"06",
              "Jul":"07","Aug":"08","Sep":"09","Oct":"10","Nov":"11","Dec":"12"}
    parts = date.split()
    day = parts[0][:-2].zfill(2)
    month = months[parts[1]]
    year = parts[2]
    RETURN f"{year}-{month}-{day}"
```
