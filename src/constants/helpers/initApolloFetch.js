const initApolloFetch = async (ctx, query) => {
    const client = ctx.apolloClient;
    try {
        const res = await client.query(query);
        const data = res.data;

        return { data }
    } catch (err) {
        return { error: { message: err.message } }
    }
}

export default initApolloFetch;