# 2525. Categorize Box According to Criteria

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/categorize-box-according-to-criteria](https://leetcode.com/problems/categorize-box-according-to-criteria)
**Companies:** Microsoft, Zendesk

---

## 1. Problem Description

Given four integers `length`, `width`, `height`, and `mass`, representing the dimensions and mass of a box, respectively, return *a string representing the **category** of the box*.

- The box is `"Bulky"` if:
  - **Any** of the dimensions of the box is greater or equal to `10⁴`.
  - Or, the **volume** of the box is greater or equal to `10⁹`.
- If the mass of the box is greater or equal to `100`, it is `"Heavy"`.
- If the box is both `"Bulky"` and `"Heavy"`, then its category is `"Both"`.
- If the box is neither `"Bulky"` nor `"Heavy"`, then its category is `"Neither"`.
- If the box is `"Bulky"` but not `"Heavy"`, then its category is `"Bulky"`.
- If the box is `"Heavy"` but not `"Bulky"`, then its category is `"Heavy"`.

**Note** that the volume of the box is the product of its length, width and height.

**Constraints:**
- `1 ≤ length, width, height ≤ 10⁵`
- `1 ≤ mass ≤ 10³`

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

```
Example 1:
  Input: length = 1000, width = 35, height = 700, mass = 300
  Output: "Heavy"
  Explanation:
  None of the dimensions of the box is greater or equal to 10⁴.
  Its volume = 24500000 <= 10⁹. So it cannot be categorized as "Bulky".
  However mass >= 100, so the box is "Heavy".
  Since the box is not "Bulky" but "Heavy", we return "Heavy".
```

```
Example 2:
  Input: length = 200, width = 50, height = 800, mass = 50
  Output: "Neither"
  Explanation:
  None of the dimensions of the box is greater or equal to 10⁴.
  Its volume = 8 * 10⁶ <= 10⁹. So it cannot be categorized as "Bulky".
  Its mass is also less than 100, so it cannot be categorized as "Heavy" either.
  Since its neither of the two above categories, we return "Neither".
```

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
