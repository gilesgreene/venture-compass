import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const firm = searchParams.get('firm'); 

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
      'x-rapidapi-host': 'crunchbase-plus.p.rapidapi.com' // Ensure this matches your specific subscription host
    }
  };

  try {
    // We target the 'investments' endpoint for the specific firm
    const response = await fetch(`https://crunchbase-plus.p.rapidapi.com/organizations/${firm}/investments`, options);
    const data = await response.json();

    // Debugging: This will show up in your VS Code terminal
    console.log("CRUNCHBASE DATA:", data);

    // Crunchbase usually nests data inside 'entities' or 'cards.investments'
    const rawDeals = data.entities || data.cards?.investments || [];

    const formattedDeals = rawDeals.map((item: any) => {
      // Accessing properties safely
      const props = item.properties || {};
      
      return {
        id: item.uuid || Math.random().toString(),
        companyName: props.organization_identifier?.value || "Unknown Startup",
        amount: props.funding_round_money_raised?.value_usd 
          ? `$${(props.funding_round_money_raised.value_usd / 1000000).toFixed(1)}M` 
          : 'Undisclosed',
        stage: props.funding_round_investment_type || 'Venture',
        date: props.announced_on || new Date().toISOString()
      };
    });

    return NextResponse.json({ deals: formattedDeals });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 });
  }
}