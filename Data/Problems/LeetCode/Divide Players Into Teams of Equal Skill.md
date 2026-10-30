# 2491. Divide Players Into Teams of Equal Skill

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/divide-players-into-teams-of-equal-skill](https://leetcode.com/problems/divide-players-into-teams-of-equal-skill)
**Companies:** Amazon, Bloomberg, Expedia, Jpmorgan, Microsoft, Paypal, Visa

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sort + Two Pointers](#approach-sort--two-pointers--on-log-n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a positive integer array `skill` of **even** length `n` where `skill[i]` denotes the skill of the `i^th` player. Divide the players into `n / 2` teams of size `2` such that the total skill of each team is **equal**.

The **chemistry** of a team is equal to the **product** of the skills of the players on that team.

Return *the sum of the **chemistry** of all the teams, or return *`-1`* if there is no way to divide the players into teams such that the total skill of each team is equal.*

**Constraints:**
- `2 <= skill.length <= 10^5`
- `skill.length` is even.
- `1 <= skill[i] <= 1000`

---

## Examples

**Example 1:**
```
Input: skill = [3,2,5,1,3,4]
Output: 22
Explanation: Divide the players into the following teams: (1, 5), (2, 4), (3, 3), where each team has a total skill of 6.
The sum of the chemistry of all the teams is: 1 * 5 + 2 * 4 + 3 * 3 = 5 + 8 + 9 = 22.
```

**Example 2:**
```
Input: skill = [3,4]
Output: 12
Explanation: The two players form a team with a total skill of 7.
The chemistry of the team is 3 * 4 = 12.
```

**Example 3:**
```
Input: skill = [1,1,2,3]
Output: -1
Explanation: There is no way to divide the players into teams such that the total skill of each team is equal.
```

---

## Key Insight

> If all teams must have equal skill sum, then after sorting, the **only valid pairing** is smallest with largest, 2nd smallest with 2nd largest, etc. The required target sum is `skill[0] + skill[n-1]`. If any pair doesn't match this target → impossible.

---

## Approach: Sort + Two Pointers — O(n log n) ✅

```
FUNCTION dividePlayers(skill):
    SORT skill
    target = skill[0] + skill[-1]
    chemistry = 0
    FOR i ← 0 TO n/2 - 1:
        IF skill[i] + skill[n-1-i] != target:
            RETURN -1
        chemistry += skill[i] * skill[n-1-i]
    RETURN chemistry
```

---

## Walkthrough

```
skill = [3,2,5,1,3,4]
After sort: [1, 2, 3, 3, 4, 5]
target = 1 + 5 = 6

i=0: skill[0]+skill[5] = 1+5 = 6 ✅  chemistry += 1×5 = 5
i=1: skill[1]+skill[4] = 2+4 = 6 ✅  chemistry += 2×4 = 8
i=2: skill[2]+skill[3] = 3+3 = 6 ✅  chemistry += 3×3 = 9

Total chemistry = 5 + 8 + 9 = 22 ✅
```

---

## Complexity Analysis

| Aspect | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | O(n log n) | Sorting dominates |
| **Space** | O(1) | In-place sort (or O(n) depending on sort impl) |

---

## Follow-Up Questions

**Q1: Can you solve this in O(n) using a hash map?**
> Yes. Compute `target = totalSum / (n/2)`. Use a frequency map: for each player with skill `s`, pair with `target - s`. This avoids sorting.

**Q2: What if teams could have more than 2 players?**
> Much harder — becomes a partition problem. For teams of size k, you'd need subset-sum-like approaches or backtracking.

**Q3: Why must the min+max pairing be the only valid one?**
> After sorting, if `a[0]` paired with anyone other than `a[n-1]`, the remaining elements can't all form pairs with the same sum (pigeonhole argument on the sorted values).

---

## Key Takeaway

> **Equal-sum pairing after sorting → two-pointer from both ends. If any pair doesn't match the target sum, it's impossible. Classic greedy + sort pattern.**
