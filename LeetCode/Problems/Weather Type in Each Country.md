# 1294. Weather Type in Each Country

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/weather-type-in-each-country](https://leetcode.com/problems/weather-type-in-each-country)
**Companies:** Point72
---

## Problem Description
You are given an array `countries` where each element is a pair `[countryName, weather]`. `weather` is a string such as "Sunny", "Rainy", or "Snowy". Return a mapping from each country to its weather type.

## Examples
- Input: `[["USA","Sunny"],["Canada","Snowy"],["India","Rainy"]]` → Output: `{"USA":"Sunny","Canada":"Snowy","India":"Rainy"}`
- Input: `[]` → Output: `{}`

## Approach
Iterate through the list and insert each pair into a hash map (dictionary) where the key is the country name and the value is the weather string.

```text
FUNCTION mapWeather(countries):
    SET weatherMap ← EMPTY MAP
    FOR pair IN countries:
        SET country ← pair[0]
        SET weather ← pair[1]
        SET weatherMap[country] ← weather
    RETURN weatherMap
```

## Walkthrough
| Step | Pair | Map after insertion |
|------|------|----------------------|
| 1    | ["USA","Sunny"] | {"USA":"Sunny"} |
| 2    | ["Canada","Snowy"] | {"USA":"Sunny","Canada":"Snowy"} |
| 3    | ["India","Rainy"] | {"USA":"Sunny","Canada":"Snowy","India":"Rainy"} |

## Complexity Analysis
- Time: O(n) where n is the number of country entries.
- Space: O(n) for the resulting map.

## Follow‑Up Questions
- How would you handle duplicate country entries with conflicting weather reports?
- What if you needed to group countries by weather type instead of mapping each country?
- Can you extend the solution to support queries for the weather of a specific country in O(1) time?

## Key Takeaway
A simple hash‑map construction from the input list provides an immediate country‑to‑weather lookup.
