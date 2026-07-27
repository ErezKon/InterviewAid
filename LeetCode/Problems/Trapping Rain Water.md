
# 42. Trapping Rain Water

**Difficulty:** 🔴 Hard
**Acceptance:** 67.4%
**LeetCode:** [https://leetcode.com/problems/trapping-rain-water](https://leetcode.com/problems/trapping-rain-water)
**Companies:** Accenture, Adobe, Airbnb, Amazon, American Express, Apple, Arcesium, Bitgo, Bloomberg, Buyhatke, Bytedance, C3 Ai, Cadence, Capgemini, Crowdstrike, De Shaw, Docusign, Epam Systems, Expedia, Flipkart, Goldman Sachs, Google, Grammarly, Hashedin, Hive, Huawei, Ibm, Infosys, Inmobi, Intel, Jpmorgan, Makemytrip, Medianet, Meta, Microsoft, Moloco, Myntra, Navi, Nextdoor, Nutanix, Nvidia, Openai, Oracle, Paypal, Paytm, Phonepe, Publicis Sapient, Qualcomm, Rakuten, Redbus, Roblox, Salesforce, Samsung, Sap, Servicenow, Snowflake, Splunk, Squarepoint Capital, Swiggy, Tcs, Tekion, Tesla, Thousandeyes, Tiktok, Twitter, Uber, Urban Company, Visa, Walmart Labs, Wix, Yandex, Zenefits, Zeta, Zoho, Zopsmart

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Visual Example](#2-visual-example)
3. [Key Insight](#3-key-insight)
4. [Approach 1: Brute Force — O(n²)](#4-approach-1-brute-force--on²)
5. [Approach 2: Prefix/Suffix Arrays — O(n)](#5-approach-2-prefixsuffix-arrays--on)
6. [Approach 3: Two Pointers — O(n) / O(1) ✅](#6-approach-3-two-pointers--on--o1-)
7. [Approach 4: Monotonic Stack — O(n)](#7-approach-4-monotonic-stack--on)
8. [Walkthrough (Two Pointers)](#8-walkthrough-two-pointers)
9. [Complexity Comparison](#9-complexity-comparison)
10. [Follow-Up Questions](#10-follow-up-questions)

---

## 1. Problem Description

Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

---

## 2. Visual Example

```
Input: height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]

        3 |                       █
        2 |           █ ░ ░ ░ ░ █ █ ░ █
        1 |   █ ░ █ █ ░ █ █ █ ░ █ █
        0 |___________________________
            0  1  0  2  1  0  1  3  2  1  2  1

█ = bar,  ░ = trapped water

Output: 6
```

---

## 3. Key Insight

Water at each position `i` is determined by:

```
water[i] = MIN(maxLeft[i], maxRight[i]) - height[i]
```

Where:
- `maxLeft[i]` = tallest bar to the left of (and including) `i`
- `maxRight[i]` = tallest bar to the right of (and including) `i`

The water level at position `i` equals the shorter of the two tallest walls — it can't be higher, or it would spill over.

---

## 4. Approach 1: Brute Force — O(n²)

For each position, scan left and right to find the maximum heights.

```
FUNCTION trapBrute(height):
    water = 0

    FOR i ← 0 TO n - 1:
        maxLeft  = MAX(height[0..i])
        maxRight = MAX(height[i..n-1])

        water += MIN(maxLeft, maxRight) - height[i]

    RETURN water
```

**Time:** O(n²) — scanning left/right for each position.

---

## 5. Approach 2: Prefix/Suffix Arrays — O(n)

Precompute `maxLeft[]` and `maxRight[]` in two passes.

```
FUNCTION trap(height):
    n = LENGTH(height)
    IF n == 0: RETURN 0

    maxLeft  = ARRAY of size n
    maxRight = ARRAY of size n

    // Build maxLeft: left-to-right pass
    maxLeft[0] = height[0]
    FOR i ← 1 TO n - 1:
        maxLeft[i] = MAX(maxLeft[i-1], height[i])

    // Build maxRight: right-to-left pass
    maxRight[n-1] = height[n-1]
    FOR i ← n - 2 DOWNTO 0:
        maxRight[i] = MAX(maxRight[i+1], height[i])

    // Calculate water
    water = 0
    FOR i ← 0 TO n - 1:
        water += MIN(maxLeft[i], maxRight[i]) - height[i]

    RETURN water
```

**Time:** O(n), **Space:** O(n)

---

## 6. Approach 3: Two Pointers — O(n) / O(1) ✅

### Why It Works

We don't actually need the full arrays. If `maxLeft < maxRight`, the water at the left pointer is determined entirely by `maxLeft` (because the right side is guaranteed to be at least `maxRight`, which is taller). Same logic applies symmetrically.

```
FUNCTION trap(height):
    left  = 0
    right = n - 1
    leftMax  = 0
    rightMax = 0
    water    = 0

    WHILE left < right:

        IF height[left] < height[right]:
            IF height[left] >= leftMax:
                leftMax = height[left]
            ELSE:
                water += leftMax - height[left]
            left += 1

        ELSE:
            IF height[right] >= rightMax:
                rightMax = height[right]
            ELSE:
                water += rightMax - height[right]
            right -= 1

    RETURN water
```

---

## 7. Approach 4: Monotonic Stack — O(n)

Process bars left to right. Maintain a stack of indices in decreasing height order. When a taller bar is found, pop and calculate water trapped in the "valley."

```
FUNCTION trapStack(height):
    stack = []                      // stores indices
    water = 0

    FOR i ← 0 TO n - 1:

        WHILE stack IS NOT EMPTY AND height[i] > height[stack.PEEK()]:
            bottom = stack.POP()

            IF stack IS EMPTY:
                BREAK

            left   = stack.PEEK()
            width  = i - left - 1
            h      = MIN(height[left], height[i]) - height[bottom]
            water += width * h

        stack.PUSH(i)

    RETURN water
```

This calculates water **layer by layer** (horizontally) rather than column by column (vertically).

---

## 8. Walkthrough (Two Pointers)

```
height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]

left=0, right=11, leftMax=0, rightMax=0, water=0

Step 1:  h[0]=0 < h[11]=1 → left side
         h[0]=0, leftMax=0 → leftMax=0, no water
         left=1

Step 2:  h[1]=1 < h[11]=1? No → right side
         h[11]=1, rightMax=0 → rightMax=1
         right=10

Step 3:  h[1]=1 < h[10]=2 → left side
         h[1]=1 >= leftMax(0) → leftMax=1
         left=2

Step 4:  h[2]=0 < h[10]=2 → left side
         h[2]=0 < leftMax(1) → water += 1-0 = 1    water=1
         left=3

Step 5:  h[3]=2 < h[10]=2? No → right side
         h[10]=2 >= rightMax(1) → rightMax=2
         right=9

Step 6:  h[3]=2 < h[9]=1? No → right side
         h[9]=1 < rightMax(2) → water += 2-1 = 1    water=2
         right=8

Step 7:  h[3]=2 < h[8]=2? No → right side
         h[8]=2 >= rightMax(2) → rightMax=2
         right=7

Step 8:  h[3]=2 < h[7]=3 → left side
         h[3]=2 >= leftMax(1) → leftMax=2
         left=4

Step 9:  h[4]=1 < h[7]=3 → left side
         h[4]=1 < leftMax(2) → water += 2-1 = 1    water=3
         left=5

Step 10: h[5]=0 < h[7]=3 → left side
         h[5]=0 < leftMax(2) → water += 2-0 = 2    water=5
         left=6

Step 11: h[6]=1 < h[7]=3 → left side
         h[6]=1 < leftMax(2) → water += 2-1 = 1    water=6
         left=7

left == right → DONE

Result: 6 ✅
```

---

## 9. Complexity Comparison

| Approach | Time | Space |
|----------|------|-------|
| Brute Force | O(n²) | O(1) |
| Prefix/Suffix Arrays | O(n) | O(n) |
| **Two Pointers** | **O(n)** | **O(1)** |
| Monotonic Stack | O(n) | O(n) |

---

## 10. Follow-Up Questions

### 10.1 Trapping Rain Water II (3D version)?

**LeetCode #407.** Given a 2D heightmap matrix, find how much water it can trap. Use a **min-heap** (priority queue) starting from the border cells and working inward — a BFS-like approach.

**Time:** O(mn · log(mn)), **Space:** O(mn)

### 10.2 What if bars have different widths?

The two-pointer approach still works conceptually, but you'd multiply the trapped height at each position by that bar's width.

### 10.3 What about circular elevation maps?

Duplicate the array (`height + height`) and apply the standard algorithm, then subtract any double-counted water. In practice, clarify with the interviewer whether "circular" means wrap-around.

### 10.4 How does this relate to Container With Most Water (#11)?

| Aspect | Trapping Rain Water | Container With Most Water |
|--------|-------------------|--------------------------|
| **What** | Total water trapped | Max area between two lines |
| **Considers** | All bars collectively | Only two bars at a time |
| **Water between** | Multiple bars form valleys | Two bars form a container |
| **Technique** | Two pointers or stack | Two pointers (greedy) |

Both use two pointers, but the movement logic differs.

---

## Key Takeaway

> Trapping Rain Water demonstrates three powerful techniques: **prefix/suffix precomputation**, **two pointers converging inward**, and **monotonic stacks**. The two-pointer approach is optimal and elegant — it works because the shorter side is always the bottleneck, so you can safely advance it.
