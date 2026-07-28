# 2525. Categorize Box According to Criteria

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/categorize-box-according-to-criteria](https://leetcode.com/problems/categorize-box-according-to-criteria)
**Companies:** Microsoft, Zendesk

---

## 1. Problem Description

Given a box's length, width, height, and mass, categorize it as "Bulky" (any dimension ≥ 10⁴ or volume ≥ 10⁹), "Heavy" (mass ≥ 100), "Both", or "Neither".

---

## 2. Approach: Conditional Check — O(1) ✅

```text
FUNCTION categorizeBox(length, width, height, mass):
    bulky = (length >= 10000 OR width >= 10000 OR height >= 10000
             OR length * width * height >= 1000000000)
    heavy = (mass >= 100)
    IF bulky AND heavy: RETURN "Both"
    IF bulky: RETURN "Bulky"
    IF heavy: RETURN "Heavy"
    RETURN "Neither"
```

---

## 2. Examples

**Example 1:**
```
length = 10000, width = 2, height = 2, mass = 150
Output: "Both"
```
*Explanation:* Length ≥ 10⁴ makes it bulky, and mass ≥ 100 makes it heavy.

**Example 2:**
```
length = 5, width = 5, height = 5, mass = 50
Output: "Neither"
```
*Explanation:* Neither dimension nor volume is large enough, and mass is below 100.

---

## 3. Walkthrough

| Step | Condition Checked | Result |
|------|-------------------|--------|
| 1 | length ≥ 10000? | true → bulky |
| 2 | mass ≥ 100? | true → heavy |
| 3 | both true? | return "Both" |

---

## 4. Complexity Analysis

- **Time:** O(1) — constant checks.
- **Space:** O(1) — only a few variables.

---

## Key Takeaway

> Pure if/else classification. Watch for integer overflow when computing volume — use long/64-bit.
