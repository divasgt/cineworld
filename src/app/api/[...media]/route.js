// import { NextResponse } from 'next/server';
// import { fetchFromTmdb } from '@/lib/tmdb';

// export async function GET(
// 	request,
// 	context
// ) {
// 	const { params } = await context;
//   // params.media will be an array of the path segments.
//   const endpoint = '/' + params.media.slice(1).join("/");
//   const param0 = params.media[0];

//   let type = "homePage";
//   if (param0==="home") type="homePage";
//   else if (param0==="details") type="detailsPage";

//   try {
//     const data = await fetchFromTmdb(endpoint, type);
//     return NextResponse.json(data);
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "An unknown error occurred";
//     return NextResponse.json(
//       {
//         error: `Failed to fetch data for endpoint: ${endpoint}`,
//         details: errorMessage,
//       },
//       { status: 500 }
//     );
//   }
// }
