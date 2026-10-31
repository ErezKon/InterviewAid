# 901. Online Stock Span

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/online-stock-span](https://leetcode.com/problems/online-stock-span)
**Companies:** Amazon, Bloomberg, Google, Ibm, Meta, Microsoft

---

## Problem Description

Design an algorithm that collects daily price quotes for some stock and returns **the span** of that stock's price for the current day.

The **span** of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.

- For example, if the prices of the stock in the last four days are `[7,2,1,2]` and the price of the stock today is 2, then the span of today is 4 because starting from today, the price of the stock was less than or equal to 2 for 4 consecutive days.
- Also, if the prices of the stock in the last four days is `[7,34,1,2]` and the price of the stock today is `8`, then the span of today is `3` because starting from today, the price of the stock was less than or equal `8` for `3` consecutive days.

Implement the `StockSpanner` class:

- `StockSpanner()` Initializes the object of the class.
- `int next(int price)` Returns the **span** of the stock's price given that today's price is `price`.

**Constraints:**
- `1 <= price <= 10^5`
- At most `10^4` calls will be made to `next`.

## Examples

**Example 1:**
```
Input
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]
Output:
[null, 1, 1, 1, 2, 1, 4, 6]
Explanation:
StockSpanner stockSpanner = new StockSpanner();
stockSpanner.next(100); // return 1
stockSpanner.next(80);  // return 1
stockSpanner.next(60);  // return 1
stockSpanner.next(70);  // return 2
stockSpanner.next(60);  // return 1
stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
stockSpanner.next(85);  // return 6
```

## Approach
Maintain a **monotonic decreasing stack** storing pairs `(price, accumulatedSpan)`. For each new price, pop while the top price ≤ current price, accumulating spans. Push the current price with its total span. This yields O(1) amortized time per query.

### Pseudocode
```text
CLASS StockSpanner:
    CONSTRUCTOR:
        SET stack ← []  // each element is (price, span)

    FUNCTION next(price):
        SET span ← 1
        WHILE stack NOT EMPTY AND stack.TOP().price ≤ price:
            SET span ← span + stack.POP().span
        END WHILE
        stack.PUSH((price, span))
        RETURN span
```

## Walkthrough
| Day | Price | Stack before `next` | Operations | Stack after | Returned span |
|-----|-------|----------------------|------------|-------------|---------------|
|0|100|[]|push (100,1)|[(100,1)]|1|
|1|80|[(100,1)]|no pop, push (80,1)|[(100,1),(80,1)]|1|
|2|60|[(100,1),(80,1)]|no pop, push (60,1)|[(100,1),(80,1),(60,1)]|1|
|3|70|[(100,1),(80,1),(60,1)]|pop (60,1) → span=2, push (70,2)|[(100,1),(80,1),(70,2)]|2|
|4|60|…|push (60,1)|…|1|
|5|75|…|pop (60,1) span=2, pop (70,2) span=4, push (75,4)|…|4|
|6|85|…|pop (75,4) span=5, pop (80,1) span=6, pop (100,1) stop, push (85,6)|…|6|

## Complexity Analysis
- Each price is pushed and popped at most once → **O(1) amortized** time per `next` call.
- Stack stores at most `n` elements → **O(n)** space in the worst case.

## Follow-Up Questions
1. How would you modify the structure to support decreasing spans (price ≥ previous)?
2. Can you answer range-maximum queries on historic prices using a similar stack technique?
3. What changes are needed if you must support price updates after insertion?

## Key Takeaway
A monotonic stack efficiently tracks previous higher prices, turning each query into constant-amortized work by aggregating spans during pops.
