"""
Prompt templates for the WaveWatch application.
"""

SURF_CONDITIONS_PROMPT = """Based on the real-time surf data provided below for {surf_beach} on {selected_date}, provide a focused surf analysis.

REAL SURF DATA:
{surf_data}

Please provide ONLY the following analysis:
1. **Overall Surf Rating** (1-100) for {selected_date} with brief reasoning
2. **Best Time to Surf** on {selected_date} - Identify and provide details for ONLY the single best time period:
   - The time range (e.g., "6:00 AM - 8:00 AM" or "11:00 AM - 12:00 PM")
   - A rating from 1-100 for that time period
   - The range of wave height in feet (e.g., "4.2-4.8ft" or "4.5ft")
   - The wave period rounded to the nearest whole number in seconds (e.g., "14s")
   - The range of wind speed in mph (e.g., "0.6-1.2mph" or "2.6mph")
   - An explanation formatted exactly as follows:
     Explanation: [detailed, in-depth explanation of why this is the optimal time to surf, considering all factors like wave quality, wind conditions, tide, period, consistency, and any other relevant factors that make it ideal compared to the rest of the day]
3. **Specific Recommendations** for surfers (board choice, skill level, etc.)
4. **Notable Changes** in conditions throughout {selected_date}

Keep it concise and actionable. Skip basic metrics since they're already displayed. Provide ONLY ONE best time period - the single optimal window for surfing."""

ONE_SENTENCE_SUMMARY_PROMPT = """Based on these surf conditions, provide a single sentence assessment of the surf quality at {beach_name} on {selected_date}. 

{formatted_conditions}

Format your response as: "[Quality] surf conditions on {selected_date} at {beach_name} because of [main factor]"

Examples:
- "Poor surf conditions on October 19th at Pleasure Point because of 15mph onshore winds"
- "Good surf conditions on October 20th at Pipeline because of clean 4ft waves and light offshore winds"
- "Fair surf conditions on October 21st at Scripps because of small 2ft waves but clean conditions"

Respond with only the single sentence assessment:"""
